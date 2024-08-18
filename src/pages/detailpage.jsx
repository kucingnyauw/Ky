import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MediaSlider from '../components/slider/slider'; // Pastikan Anda mengimpor komponen ini dengan benar
import Footer from '../components/common/footer'; // Pastikan Anda mengimpor komponen ini dengan benar
import './styles/detail-page.css';
import TypingIndicator from '../components/loading/loading';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faX, } from '@fortawesome/free-solid-svg-icons';
import { faSquareShareNodes } from '@fortawesome/free-solid-svg-icons/faSquareShareNodes';

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon,
    EmailIcon
} from 'react-share';




const DetailPage = () => {
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const currentUrl = window.location.href;
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



    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl);
    };

    return (
        <div className="detail-page">
            <div className="page-content">

                <div className="content-wrapper">
                    {isOpen && (
                        <div className="popup">
                            <div className={`share-modal ${isOpen ? 'share-modal-open' : ''}`}>
                                <header className='share-modal-header'>
                                    <h1 className='share-modal-title'>Share Content</h1>
                                    <button className='share-modal-close' onClick={() => setIsOpen(false)}>
                                       X
                                    </button>
                                </header>
                                <div className='share-modal-content'>
                                    <p className='share-modal-text'>Share this link via</p>
                                    <ul className='share-modal-icons'>
                                        <li className='share-icon'>
                                            <FacebookShareButton url={currentUrl} >
                                                <FacebookIcon size={32} round   className='icon-share'  />
                                            </FacebookShareButton>
                                        </li>
                                        <li className='share-icon'>
                                            <TwitterShareButton url={currentUrl}>
                                                <TwitterIcon size={32} round  className='icon-share'  />
                                            </TwitterShareButton>
                                        </li>
                                        <li className='share-icon'>
                                            <WhatsappShareButton url={currentUrl}>
                                                <WhatsappIcon size={32} round  className='icon-share' />
                                            </WhatsappShareButton>
                                        </li>
                                        <li className='share-icon'>
                                            <TelegramShareButton url={currentUrl}>
                                                <TelegramIcon size={32} round  className='icon-share' />
                                            </TelegramShareButton>
                                        </li>
                                        <li className='share-icon'>
                                            <EmailShareButton url={currentUrl}>
                                                <EmailIcon size={32} round className='icon-share' />
                                            </EmailShareButton>
                                        </li>
                                    </ul>
                                    <p className='share-modal-text'>Or copy link</p>
                                    <div className='share-modal-copy-field'>
                                      
                                        <input type='text' className='share-modal-url-input' readOnly value={currentUrl} />
                                        <button className='share-modal-copy-button' onClick={handleCopy}>Copy</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}


                   
                    <div className="project-posted-author">
                        <div className='project-posted-wrapper'>
                            <img
                                src="../me.png"
                                alt="about"
                                className="project-image"
                            />
                            <div className='project-detail-wrapper'>
                                <h6 className='author-name'>{projects.author}</h6>
                                <h6 className='publication-info'>
                                    Published in <span className='publication-bold'>Personal Web</span>
                                    <span className="divider"></span>
                                    {projects.formattedDatetime}
                                </h6>
                            </div>
                        </div>

                        <FontAwesomeIcon className='share' onClick={() => setIsOpen(!isOpen)} icon={faShare}></FontAwesomeIcon>

                    </div>


                    <div className="slider-container">
                        <MediaSlider items={mediaItems} />
                    </div>
                    <div className="title-secondary">
                        <h1>{projects.title}</h1>


                    </div>

                    <div className="project-categories">
                        <h5 className='title-head'>
                            Tags
                        </h5>
                        <p className='subtitle deskripsi'>
                            {projects.categories}
                        </p>
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