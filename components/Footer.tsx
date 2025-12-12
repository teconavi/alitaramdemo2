import React, { useContext } from 'react';
import { AppContext } from '../App';
import Glass from './Glass';

const Footer: React.FC = () => {
    const { t } = useContext(AppContext);
    
    return (
        <footer className="mt-20 border-t border-white/20 bg-white/30 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white font-bold text-xs">
                                A
                            </div>
                            <span className="font-display font-bold text-neutral-text">
                                Ali<span className="text-primary-end">Taram</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Restoring independence through innovative rehabilitation solutions.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-neutral-text mb-4 text-sm uppercase tracking-wider">Products</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-primary-start">Mobility Aids</a></li>
                            <li><a href="#" className="hover:text-primary-start">Bathroom Safety</a></li>
                            <li><a href="#" className="hover:text-primary-start">Patient Lifts</a></li>
                            <li><a href="#" className="hover:text-primary-start">Rentals</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-neutral-text mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-primary-start">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-start">Clinicians</a></li>
                            <li><a href="#" className="hover:text-primary-start">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-start">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-neutral-text mb-4 text-sm uppercase tracking-wider">Support</h4>
                        <p className="text-sm text-gray-600 mb-2">+98 21 8888 0000</p>
                        <p className="text-sm text-gray-600">support@alitaram.com</p>
                        <div className="mt-4 flex gap-2">
                             {/* Social Icons Placeholder */}
                             <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-primary-start hover:text-white transition-colors cursor-pointer flex items-center justify-center">
                                <span className="text-xs">in</span>
                             </div>
                             <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-primary-start hover:text-white transition-colors cursor-pointer flex items-center justify-center">
                                <span className="text-xs">ig</span>
                             </div>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>{t.footerText}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;