import  { useState } from 'react';
import { UCPForm } from './UCPForm';
import { TCFForm } from './TCFForm';
import { EFForm } from './EFForm';
import { Results } from './Results';
import { Instructions } from './Instructions';
import { AIChatBox } from './AIChatBox';
import { CalculatorIcon, InfoIcon, SettingsIcon, ChevronRightIcon, BotMessageSquare  } from 'lucide-react';

export interface UAWData {
  simple: number;
  average: number;
  complex: number;
}

export interface UUCWData {
  simple: number;
  average: number;
  complex: number;
}

export interface UCPData {
  uaw: UAWData;
  uucw: UUCWData;
}

interface Factor {
  id: number;
  name: string;
  weight: number;
  value: number;
}

interface TCFData {
  factors: Factor[];
}

interface EFData {
  factors: Factor[];
}

interface FormData {
  ucp: UCPData;
  tcf: TCFData;
  ef: EFData;
  productivityFactor: number;
}

interface AIAnalysisValues {
  uaw?: {
    simple?: number;
    average?: number;
    complex?: number;
  };
  uucw?: {
    simple?: number;
    average?: number;
    complex?: number;
  };
}

export function Calculator() {
  const [activeTab, setActiveTab] = useState('ucp');
  const [formData, setFormData] = useState<FormData>({
    ucp: {
      uaw: {
        simple: 0,
        average: 0,
        complex: 0
      },
      uucw: {
        simple: 0,
        average: 0,
        complex: 0
      }
    },
    tcf: {
      factors: [{
        id: 1,
        name: 'Distributed System',
        weight: 2,
        value: 3
      }, {
        id: 2,
        name: 'Response Time/Performance',
        weight: 1,
        value: 3
      }, {
        id: 3,
        name: 'End-User Efficiency',
        weight: 1,
        value: 3
      }, {
        id: 4,
        name: 'Complex Processing',
        weight: 1,
        value: 3
      }, {
        id: 5,
        name: 'Reusability',
        weight: 1,
        value: 3
      }, {
        id: 6,
        name: 'Easy to Install',
        weight: 0.5,
        value: 3
      }, {
        id: 7,
        name: 'Easy to Use',
        weight: 0.5,
        value: 3
      }, {
        id: 8,
        name: 'Portability',
        weight: 2,
        value: 3
      }, {
        id: 9,
        name: 'Easy to Change',
        weight: 1,
        value: 3
      }, {
        id: 10,
        name: 'Concurrency',
        weight: 1,
        value: 3
      }, {
        id: 11,
        name: 'Special Security Features',
        weight: 1,
        value: 3
      }, {
        id: 12,
        name: 'Direct Access for Third Parties',
        weight: 1,
        value: 3
      }, {
        id: 13,
        name: 'Special User Training Facilities',
        weight: 1,
        value: 3
      }]
    },
    ef: {
      factors: [{
        id: 1,
        name: 'Familiarity with Project',
        weight: 1.5,
        value: 3
      }, {
        id: 2,
        name: 'Application Experience',
        weight: 0.5,
        value: 3
      }, {
        id: 3,
        name: 'Object-Oriented Experience',
        weight: 1,
        value: 3
      }, {
        id: 4,
        name: 'Lead Analyst Capability',
        weight: 0.5,
        value: 3
      }, {
        id: 5,
        name: 'Motivation',
        weight: 1,
        value: 3
      }, {
        id: 6,
        name: 'Stable Requirements',
        weight: 2,
        value: 3
      }, {
        id: 7,
        name: 'Part-Time Staff',
        weight: -1,
        value: 3
      }, {
        id: 8,
        name: 'Difficult Programming Language',
        weight: -1,
        value: 3
      }]
    },
    productivityFactor: 20
  });
  const calculateUUCP = () => {
    const {
      uaw,
      uucw
    } = formData.ucp;
    const uawTotal = uaw.simple * 1 + uaw.average * 2 + uaw.complex * 3;
    const uucwTotal = uucw.simple * 5 + uucw.average * 10 + uucw.complex * 15;
    return uawTotal + uucwTotal;
  };
  const calculateTCF = () => {
    const tfSum = formData.tcf.factors.reduce((sum, factor) => {
      return sum + factor.weight * factor.value;
    }, 0);
    return 0.6 + 0.01 * tfSum;
  };
  const calculateEF = () => {
    const efSum = formData.ef.factors.reduce((sum, factor) => {
      return sum + factor.weight * factor.value;
    }, 0);
    return 1.4 + -0.03 * efSum;
  };
  const calculateUCP = () => {
    const uucp = calculateUUCP();
    const tcf = calculateTCF();
    const ef = calculateEF();
    return uucp * tcf * ef;
  };
  const calculateEffort = () => {
    const ucp = calculateUCP();
    return ucp * formData.productivityFactor;
  };
  const handleInputChange = (section: keyof FormData, data: any) => {
    setFormData({
      ...formData,
      [section]: data
    });
  };
  const handleProductivityFactorChange = (value: number) => {
    setFormData({
      ...formData,
      productivityFactor: value
    });
  };

  const handleAIAnalysisValues = (values: AIAnalysisValues) => {
    if (values.uaw || values.uucw) {
      const newUCP = {
        ...formData.ucp,
        uaw: values.uaw ? {
          ...formData.ucp.uaw,
          ...values.uaw
        } : formData.ucp.uaw,
        uucw: values.uucw ? {
          ...formData.ucp.uucw,
          ...values.uucw
        } : formData.ucp.uucw
      };
      
      handleInputChange('ucp', newUCP);
      setActiveTab('ucp'); // Switch to UCP tab to show filled values
    }
  };

  return <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="flex border-b">
        <button className={`flex items-center px-4 py-3 ${activeTab === 'ucp' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('ucp')}>
          <CalculatorIcon className="w-4 h-4 mr-2" />
          <span>UCP</span>
        </button>
        <button className={`flex items-center px-4 py-3 ${activeTab === 'tcf' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('tcf')}>
          <SettingsIcon className="w-4 h-4 mr-2" />
          <span>TCF</span>
        </button>
        <button className={`flex items-center px-4 py-3 ${activeTab === 'ef' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('ef')}>
          <SettingsIcon className="w-4 h-4 mr-2" />
          <span>EF</span>
        </button>
        <button className={`flex items-center px-4 py-3 ${activeTab === 'results' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('results')}>
          <ChevronRightIcon className="w-4 h-4 mr-2" />
          <span>Results</span>
        </button>
        <button className={`flex items-center px-4 py-3 ${activeTab === 'ai' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('ai')}>
          <BotMessageSquare  className="w-4 h-4 mr-2" />
          <span>AI Assistant</span>
        </button>
        <button className={`flex items-center px-4 py-3 ${activeTab === 'instructions' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('instructions')}>
          <InfoIcon className="w-4 h-4 mr-2" />
          <span>Instructions</span>
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'ucp' && <UCPForm data={formData.ucp} onChange={(data: UCPData) => handleInputChange('ucp', data)} productivityFactor={formData.productivityFactor} onProductivityFactorChange={handleProductivityFactorChange} />}
        {activeTab === 'tcf' && <TCFForm data={formData.tcf} onChange={(data: TCFData) => handleInputChange('tcf', data)} />}
        {activeTab === 'ef' && <EFForm data={formData.ef} onChange={(data: EFData) => handleInputChange('ef', data)} />}
        {activeTab === 'results' && <Results uucp={calculateUUCP()} tcf={calculateTCF()} ef={calculateEF()} ucp={calculateUCP()} effort={calculateEffort()} productivityFactor={formData.productivityFactor} />}
        {activeTab === 'ai' && <AIChatBox onInsertValues={handleAIAnalysisValues} />}
        {activeTab === 'instructions' && <Instructions />}
      </div>
    </div>;
}