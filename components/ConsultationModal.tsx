import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import Glass from './Glass';
import Button from './Button';
import { ConsultationStep, ConsultationFormData } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ConsultationModalProps {
  onClose: () => void;
  productId?: string;
}

// Helper for Input Fields (Responsive)
const InputGroup = ({ label, icon, children }: { label: string, icon: React.ReactNode, children?: React.ReactNode }) => (
  <div className="group w-full mb-4">
      <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-primary-start transition-colors">
          {label}
      </label>
      <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors pointer-events-none">
              {icon}
          </div>
          {children}
      </div>
  </div>
);

const ConsultationModal: React.FC<ConsultationModalProps> = ({ onClose, productId }) => {
  const { t } = useContext(AppContext);
  const [step, setStep] = useState<ConsultationStep>(ConsultationStep.CONTACT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    province: '',
    mobilityLevel: 'Independent',
    condition: '',
    details: '',
    originProductId: productId
  });

  const selectedProduct = productId ? MOCK_PRODUCTS.find(p => p.id === productId) : null;

  const handleNext = () => {
    if (step < ConsultationStep.CONFIRM) {
      setStep(step + 1);
    } else {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            alert("Consultation Request Sent Successfully!");
        }, 1500);
    }
  };

  const handleBack = () => {
    if (step > ConsultationStep.CONTACT) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case ConsultationStep.CONTACT:
        return (
          <div className="animate-slide-up space-y-4">
             <div className="bg-primary-start/5 border border-primary-start/20 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-primary-start/10 rounded-lg text-primary-start shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Patient Profile</h4>
                    <p className="text-xs text-gray-400">Who is this equipment for?</p>
                </div>
             </div>

             <div className="pt-2">
                <InputGroup label="Full Name" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}>
                    <input 
                        type="text" 
                        className="block w-full rounded-xl bg-[#0A0C10] border border-white/10 text-white placeholder-gray-600 focus:border-primary-start focus:ring-1 focus:ring-primary-start focus:outline-none transition-all py-3.5 px-4 pl-10 text-sm"
                        placeholder="e.g. Jane Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        autoFocus
                    />
                </InputGroup>

                <InputGroup label="Phone Number" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}>
                    <input 
                        type="tel" 
                        className="block w-full rounded-xl bg-[#0A0C10] border border-white/10 text-white placeholder-gray-600 focus:border-primary-start focus:ring-1 focus:ring-primary-start focus:outline-none transition-all py-3.5 px-4 pl-10 text-sm"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                </InputGroup>

                <InputGroup label="Province" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>}>
                    <select 
                        className="block w-full rounded-xl bg-[#0A0C10] border border-white/10 text-white focus:border-primary-start focus:ring-1 focus:ring-primary-start focus:outline-none transition-all py-3.5 px-4 pl-10 text-sm appearance-none"
                        value={formData.province}
                        onChange={e => setFormData({...formData, province: e.target.value})}
                    >
                        <option value="" className="text-gray-500">Select Region</option>
                        <option value="ON">Ontario (ON)</option>
                        <option value="BC">British Columbia (BC)</option>
                        <option value="QC">Quebec (QC)</option>
                        <option value="AB">Alberta (AB)</option>
                        <option value="Other">Other</option>
                    </select>
                </InputGroup>
             </div>
          </div>
        );
      case ConsultationStep.CONDITION:
        const mobilityOptions = [
            { label: 'Independent', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 4v7l-2 3H8v8"/><path d="M16 4v16"/><circle cx="14.5" cy="2" r="1.5"/></svg> },
            { label: 'Uses Cane', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 22h3a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8"/><circle cx="10" cy="4" r="2"/></svg> },
            { label: 'Walker', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 22V10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/><path d="M5 22V12"/><path d="M19 22V12"/><path d="M5 12h14"/></svg> },
            { label: 'Wheelchair', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
            { label: 'Bedbound', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20"/><path d="M5 12v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M4 16h16"/></svg> }
        ];

        return (
            <div className="animate-slide-up flex flex-col h-full">
                <div className="mb-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Mobility Status</span>
                    <div className="grid grid-cols-3 gap-3">
                        {mobilityOptions.map((opt) => (
                            <div 
                                key={opt.label}
                                onClick={() => setFormData({...formData, mobilityLevel: opt.label})}
                                className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center gap-2 border transition-all duration-300 min-h-[90px] ${
                                    formData.mobilityLevel === opt.label 
                                    ? 'bg-primary-start/20 border-primary-start shadow-[0_0_15px_rgba(0,220,130,0.15)] scale-[1.02]' 
                                    : 'bg-[#0A0C10] border-white/10 hover:border-white/30 hover:bg-white/5'
                                }`}
                            >
                                <div className={`${formData.mobilityLevel === opt.label ? 'text-primary-start' : 'text-gray-400'} transform scale-90`}>
                                    {opt.icon}
                                </div>
                                <span className={`text-[10px] font-bold text-center leading-tight ${formData.mobilityLevel === opt.label ? 'text-white' : 'text-gray-500'}`}>
                                    {opt.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto">
                    <InputGroup label="Primary Condition" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}>
                        <input 
                            type="text" 
                            className="block w-full rounded-xl bg-[#0A0C10] border border-white/10 text-white placeholder-gray-600 focus:border-primary-start focus:ring-1 focus:ring-primary-start focus:outline-none transition-all py-3.5 px-4 pl-10 text-sm"
                            placeholder="e.g. Arthritis, Stroke..."
                            value={formData.condition}
                            onChange={e => setFormData({...formData, condition: e.target.value})}
                        />
                    </InputGroup>
                </div>
            </div>
        );
      case ConsultationStep.CONTEXT:
         return (
            <div className="space-y-4 animate-slide-up flex flex-col h-full">
                <div className="flex-1 flex flex-col min-h-0">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Clinical Context</span>
                    <div className="relative group flex-1 min-h-[150px]">
                        <textarea 
                            className="block w-full h-full rounded-xl bg-[#0A0C10] border border-white/10 text-white placeholder-gray-600 focus:border-primary-start focus:ring-1 focus:ring-primary-start focus:outline-none transition-all p-4 text-sm resize-none leading-relaxed"
                            placeholder="Describe the environment (e.g. 'Narrow hallway', 'Tub has high wall')..."
                            value={formData.details}
                            onChange={e => setFormData({...formData, details: e.target.value})}
                        />
                        <div className="absolute top-4 right-4 text-gray-600 group-focus-within:text-primary-start pointer-events-none">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 shrink-0">
                    <div className="text-blue-400 mt-0.5 shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p className="text-xs text-blue-200 leading-relaxed">
                        Our specialist may request photos via SMS after reviewing this context.
                    </p>
                </div>
            </div>
         );
      case ConsultationStep.CONFIRM:
         return (
            <div className="space-y-6 animate-slide-up h-full flex flex-col justify-center">
                
                <div className="text-center shrink-0">
                    <h3 className="text-xl font-display font-bold text-white mb-1">Review Request</h3>
                    <p className="text-gray-400 text-sm">Confirm details before submitting.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden relative shrink-0">
                    <div className="h-1 w-full bg-gradient-to-r from-primary-start to-accent-start"></div>
                    
                    <div className="p-5 space-y-4">
                        {selectedProduct && (
                             <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                                <img src={selectedProduct.imageUrl} className="w-14 h-14 rounded-lg object-cover bg-gray-800" />
                                <div>
                                    <p className="text-[10px] text-primary-start font-bold uppercase tracking-wider">Interest</p>
                                    <p className="font-bold text-white text-base">{selectedProduct.name}</p>
                                </div>
                             </div>
                        )}

                        <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Patient</p>
                                <p className="text-sm text-gray-200 font-medium truncate">{formData.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Contact</p>
                                <p className="text-sm text-gray-200 font-medium truncate">{formData.phone || '-'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Mobility</p>
                                <p className="text-sm text-gray-200 font-medium truncate">{formData.mobilityLevel}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Location</p>
                                <p className="text-sm text-gray-200 font-medium truncate">{formData.province || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500 shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>Encrypted & HIPAA compliant.</span>
                </div>
            </div>
         );
    }
  };

  const steps = [
    { label: 'Contact', icon: '1' },
    { label: 'Status', icon: '2' },
    { label: 'Context', icon: '3' },
    { label: 'Review', icon: '4' }
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-[#0F1115] sm:bg-black/70 sm:backdrop-blur-sm flex items-center justify-center">
        <Glass 
            intensity="heavy" 
            rounded="none" 
            className="w-full h-[100dvh] sm:h-[80vh] sm:max-w-lg sm:rounded-2xl border-0 sm:border border-white/10 bg-[#0F1115] flex flex-col"
            contentClassName="flex flex-col h-full"
        >
            {/* Header */}
            <div className="px-6 pt-6 pb-2 bg-[#15181E] shrink-0 border-b border-white/5">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-display font-bold text-white flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-primary-start rounded-full"></span>
                        Request Consultation
                    </h2>
                    <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Stepper */}
                <div className="flex justify-between items-center px-4 relative pb-6">
                    <div className="absolute top-[15px] left-8 right-8 h-[2px] bg-white/10 -z-0">
                         <div 
                            className="h-full bg-primary-start transition-all duration-500 ease-in-out"
                            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                         ></div>
                    </div>
                    {steps.map((s, i) => {
                        const isActive = i === step;
                        const isCompleted = i < step;
                        return (
                            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                                    isActive 
                                    ? 'bg-primary-start border-primary-start text-black shadow-[0_0_15px_rgba(0,220,130,0.5)] scale-110' 
                                    : isCompleted 
                                        ? 'bg-[#0F1115] border-primary-start text-primary-start'
                                        : 'bg-[#0F1115] border-white/20 text-gray-500'
                                }`}>
                                    {isCompleted ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    ) : (
                                        s.icon
                                    )}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                    {s.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto min-h-0 p-6">
                {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#15181E] flex justify-between items-center shrink-0 z-20 pb-safe">
                <button 
                    onClick={handleBack}
                    disabled={step === 0 || isSubmitting}
                    className={`text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2 px-2 py-2 ${step === 0 ? 'invisible pointer-events-none' : ''}`}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Back
                </button>
                
                <Button 
                    variant="primary" 
                    onClick={handleNext} 
                    className={`h-12 min-w-[140px] text-sm font-bold shadow-lg shadow-primary-start/20 ${isSubmitting ? 'opacity-80' : ''}`}
                    disabled={isSubmitting}
                    icon={isSubmitting ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : undefined}
                >
                    {step === ConsultationStep.CONFIRM ? 'Submit' : 'Continue'}
                </Button>
            </div>
        </Glass>
    </div>
  );
};

export default ConsultationModal;