import type { UCPData } from './Calculator';

interface UCPFormProps {
  data: UCPData;
  onChange: (data: UCPData) => void;
  productivityFactor: number;
  onProductivityFactorChange: (value: number) => void;
}

export function UCPForm({
  data,
  onChange,
  productivityFactor,
  onProductivityFactorChange
}: UCPFormProps) {
  const handleUAWChange = (type: string, value: string) => {
    const newData = {
      ...data,
      uaw: {
        ...data.uaw,
        [type]: parseInt(value) || 0
      }
    };
    onChange(newData);
  };
  const handleUUCWChange = (type: string, value: string) => {
    const newData = {
      ...data,
      uucw: {
        ...data.uucw,
        [type]: parseInt(value) || 0
      }
    };
    onChange(newData);
  };
  return <div>
      <h2 className="mb-4 text-xl font-bold">
        Use Case Points (UCP) Calculation
      </h2>
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Unadjusted Actor Weight (UAW)
        </h3>
        <p className="mb-3 text-sm text-gray-600">
          Count the number of actors in each category:
        </p>
        <div className="grid gap-4 mb-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-gray-50">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Simple (Weight: 1)
            </label>
            <p className="mb-2 text-xs text-gray-500">
              API, other system with defined API
            </p>
            <input type="number" min="0" value={data.uaw.simple} onChange={e => handleUAWChange('simple', e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Average (Weight: 2)
            </label>
            <p className="mb-2 text-xs text-gray-500">
              Interactive interface or protocol
            </p>
            <input type="number" min="0" value={data.uaw.average} onChange={e => handleUAWChange('average', e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Complex (Weight: 3)
            </label>
            <p className="mb-2 text-xs text-gray-500">
              Human user with GUI interface
            </p>
            <input type="number" min="0" value={data.uaw.complex} onChange={e => handleUAWChange('complex', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div className="p-3 text-sm rounded-lg bg-blue-50">
          <strong>UAW Total:</strong>{' '}
          {data.uaw.simple * 1 + data.uaw.average * 2 + data.uaw.complex * 3}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Unadjusted Use Case Weight (UUCW)
        </h3>
        <p className="mb-3 text-sm text-gray-600">
          Count the number of use cases in each category:
        </p>
        <div className="grid gap-4 mb-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-gray-50">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Simple (Weight: 5)
            </label>
            <p className="mb-2 text-xs text-gray-500">
              1-3 transactions, less than 5 analysis classes
            </p>
            <input type="number" min="0" value={data.uucw.simple} onChange={e => handleUUCWChange('simple', e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Average (Weight: 10)
            </label>
            <p className="mb-2 text-xs text-gray-500">
              4-7 transactions, 5-10 analysis classes
            </p>
            <input type="number" min="0" value={data.uucw.average} onChange={e => handleUUCWChange('average', e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Complex (Weight: 15)
            </label>
            <p className="mb-2 text-xs text-gray-500">
              More than 7 transactions, more than 10 analysis classes
            </p>
            <input type="number" min="0" value={data.uucw.complex} onChange={e => handleUUCWChange('complex', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div className="p-3 text-sm rounded-lg bg-blue-50">
          <strong>UUCW Total:</strong>{' '}
          {data.uucw.simple * 5 + data.uucw.average * 10 + data.uucw.complex * 15}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">Productivity Factor</h3>
        <p className="mb-2 text-sm text-gray-600">
          Hours per Use Case Point (typically between 15 and 30):
        </p>
        <input type="number" min="1" value={productivityFactor} onChange={e => onProductivityFactorChange(parseInt(e.target.value) || 20)} className="w-full p-2 border rounded md:w-1/3" />
      </div>
      <div className="p-4 mt-6 rounded-lg bg-blue-50">
        <h3 className="font-semibold">Unadjusted Use Case Points (UUCP)</h3>
        <p className="text-lg">
          {data.uaw.simple * 1 + data.uaw.average * 2 + data.uaw.complex * 3 + data.uucw.simple * 5 + data.uucw.average * 10 + data.uucw.complex * 15}
        </p>
        <p className="text-xs text-gray-600">UUCP = UAW + UUCW</p>
      </div>
    </div>;
}