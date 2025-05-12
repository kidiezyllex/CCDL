interface Factor {
  id: number;
  name: string;
  weight: number;
  value: number;
}

interface EFData {
  factors: Factor[];
}

export function EFForm({
  data,
  onChange
}: { data: EFData; onChange: (data: EFData) => void }
) {
  const handleFactorChange = (
    id: number,
    value: string
  ) => {
    const newFactors = data.factors.map((factor: Factor) => {
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
    return data.factors.reduce((sum: number, factor: Factor) => sum + factor.weight * factor.value, 0);
  };
  const calculateEF = () => {
    return 1.4 + -0.03 * calculateEFactor();
  };
  return <div>
      <h2 className="mb-4 text-xl font-bold">Environmental Factor (EF)</h2>
      <p className="mb-4 text-sm text-gray-600">
        Rate each factor from 0 (no influence) to 5 (strong influence):
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-sm font-medium text-left text-gray-600">
                Factor
              </th>
              <th className="px-3 py-2 text-sm font-medium text-left text-gray-600">
                Weight
              </th>
              <th className="px-3 py-2 text-sm font-medium text-left text-gray-600">
                Rating (0-5)
              </th>
              <th className="px-3 py-2 text-sm font-medium text-left text-gray-600">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {data.factors.map((factor: Factor) => <tr key={factor.id} className="border-t">
                <td className="px-3 py-2 text-sm">{factor.name}</td>
                <td className="px-3 py-2 text-sm">{factor.weight}</td>
                <td className="px-3 py-2">
                  <input type="number" min="0" max="5" step="0.5" value={factor.value} onChange={e => handleFactorChange(factor.id, e.target.value)} className="w-16 p-1 border rounded" />
                </td>
                <td className="px-3 py-2 text-sm">
                  {(factor.weight * factor.value).toFixed(2)}
                </td>
              </tr>)}
          </tbody>
          <tfoot>
            <tr className="font-medium bg-gray-50">
              <td colSpan={3} className="px-3 py-2 text-right">
                Total EFactor:
              </td>
              <td className="px-3 py-2">{calculateEFactor().toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="p-4 mt-6 rounded-lg bg-blue-50">
        <h3 className="font-semibold">Environmental Factor (EF)</h3>
        <p className="text-lg">{calculateEF().toFixed(2)}</p>
        <p className="text-xs text-gray-600">EF = 1.4 + (-0.03 × EFactor)</p>
      </div>
    </div>;
}