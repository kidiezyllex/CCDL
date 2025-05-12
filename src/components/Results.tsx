interface ResultsProps {
  uucp: number;
  tcf: number;
  ef: number;
  ucp: number;
  effort: number;
  productivityFactor: number;
}

export function Results({
  uucp,
  tcf,
  ef,
  ucp,
  effort,
  productivityFactor
}: ResultsProps) {
  return <div>
      <h2 className="mb-4 text-xl font-bold">Calculation Results</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="mb-2 text-lg font-semibold">Intermediate Values</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">
                Unadjusted Use Case Points (UUCP):
              </div>
              <div className="font-medium">{uucp.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">
                Technical Complexity Factor (TCF):
              </div>
              <div className="font-medium">{tcf.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">
                Environmental Factor (EF):
              </div>
              <div className="font-medium">{ef.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-blue-50">
          <h3 className="mb-2 text-lg font-semibold">Final Estimates</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">
                Use Case Points (UCP):
              </div>
              <div className="text-2xl font-bold">{ucp.toFixed(2)}</div>
              <div className="text-xs text-gray-500">UCP = UUCP × TCF × EF</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">
                Effort Estimate (hours):
              </div>
              <div className="text-2xl font-bold">{effort.toFixed(0)}</div>
              <div className="text-xs text-gray-500">
                Effort = UCP × {productivityFactor} hours/UCP
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">
                Effort in person-days (8h):
              </div>
              <div className="font-medium">{(effort / 8).toFixed(1)} days</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">
                Effort in person-months (22d):
              </div>
              <div className="font-medium">
                {(effort / 8 / 22).toFixed(1)} months
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-6 border border-yellow-200 rounded-lg bg-yellow-50">
        <h3 className="mb-2 font-medium">Note:</h3>
        <p className="text-sm text-gray-700">
          The effort estimation is based on the productivity factor of{' '}
          {productivityFactor} hours per UCP. This can vary based on team
          experience and project complexity. Industry standard ranges from 15 to
          30 hours per UCP.
        </p>
      </div>
    </div>;
}