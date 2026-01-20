
import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.INTRO, label: 'Início' },
  { id: Step.SETUP, label: 'Projeto' },
  { id: Step.AI_GENERATE, label: 'Documentação' },
  { id: Step.COMMANDS, label: 'Comandos' },
  { id: Step.FINISH, label: 'Concluído' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center min-w-[80px]">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= step.id
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {currentStep > step.id ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-slate-400'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 min-w-[20px] mb-6 ${
                currentStep > step.id ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
