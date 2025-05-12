import React from 'react';
export function EFForm({
  data,
  onChange
}) {
  const handleFactorChange = (id, value) => {
    const newFactors = data.factors.map(factor => {
      if (factor.id === id) {
        return {
          ...factor,
          value: parseFloat(value)
        };
      }
      return factor;
    });
    onChange({
      ...data,
      factors: newFactors
    });
  };
  const calculateEFactor = () => {
    return data.factors.reduce((sum, factor) => sum + factor.weight * factor.value, 0);
  };
  const calculateEF = () => {
    return 1.4 + -0.03 * calculateEFactor();
  };
  return <div>
      <h2 className="text-xl font-bold mb-4">Environmental Factor (EF)</h2>
      <p className="text-sm text-gray-600 mb-4">
        Rate each factor from 0 (no influence) to 5 (strong influence):
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">
                Factor
              </th>
              <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">
                Weight
              </th>
              <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">
                Rating (0-5)
              </th>
              <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {data.factors.map(factor => <tr key={factor.id} className="border-t">
                <td className="py-2 px-3 text-sm">{factor.name}</td>
                <td className="py-2 px-3 text-sm">{factor.weight}</td>
                <td className="py-2 px-3">
                  <input type="number" min="0" max="5" step="0.5" value={factor.value} onChange={e => handleFactorChange(factor.id, e.target.value)} className="w-16 p-1 border rounded" />
                </td>
                <td className="py-2 px-3 text-sm">
                  {(factor.weight * factor.value).toFixed(2)}
                </td>
              </tr>)}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-medium">
              <td colSpan={3} className="py-2 px-3 text-right">
                Total EFactor:
              </td>
              <td className="py-2 px-3">{calculateEFactor().toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold">Environmental Factor (EF)</h3>
        <p className="text-lg">{calculateEF().toFixed(2)}</p>
        <p className="text-xs text-gray-600">EF = 1.4 + (-0.03 × EFactor)</p>
      </div>
    </div>;
}