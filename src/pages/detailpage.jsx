import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MediaSlider from '../components/slider/slider'; // Pastikan Anda mengimpor komponen ini dengan benar
import Footer from '../components/common/footer'; // Pastikan Anda mengimpor komponen ini dengan benar
import './styles/detail-page.css';
import TypingIndicator from '../components/loading/loading';



const DetailPage = () => {
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const location = useLocation();
    const { instanceId } = useParams();



    useEffect(() => {
        const fetchProjects = async () => {
            try {

                const response = await fetch(`${process.env.REACT_APP_SECRET}ambil/${instanceId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();

                    if (Array.isArray(data)) {
                        setProjects(data[0]);
                    } else if (data && typeof data === 'object') {
                        setProjects(data);
                    } else {
                        throw new Error('Unexpected JSON structure');
                    }
                } else {
                    throw new Error('Unexpected content type');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [instanceId]);

    if (loading) {
        return (

            <TypingIndicator></TypingIndicator>

        );
    }

    if (error) {
        return <TypingIndicator></TypingIndicator>
    }

    const mediaItems = [
        ...(projects.assetUrls ? projects.assetUrls.map((url) => ({ imageUrl: url, videoUrl: null })) : []),
        ...(projects.videoUrl ? [{ imageUrl: null, videoUrl: projects.videoUrl }] : [])
    ];

    return (
        <div className="detail-page">
            <div className="page-content">
                <div className="content-wrapper">
                    
                <div className='project-title-overview'>
                        <h4 className='title-third'>Project Overview</h4>
                        <div className="project-right">
                       
                        <h6 className='formatted-datetime'>{projects.formattedDatetime}</h6>

                        </div>
                    </div>

                    <div className="slider-container">
                        <MediaSlider items={mediaItems} />
                    </div>

                    <div className="title-secondary">
                        <h1>{projects.title}</h1>


                    </div>



                    <div className="project-description-wrapper">
                        <h4 className='title-head '>Description</h4>
                        <p className='subtitle deskripsi '>{projects.subtitle}</p>
                    </div>

                    <div className="project-stack">
                        <h5 className='title-head'>Tech Stack</h5>
                        <div className="project-logo-wrapper">
                            {projects.iconUrls && projects.iconUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Icon ${index}`} className="logo-stack" />
                            ))}
                        </div>
                    </div>

                    <div className="project-bottomBar">
                        <a href={projects.url || "#"}>Source</a> {/* Ensure valid URL */}


                    </div>
                    <div className="page-footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;