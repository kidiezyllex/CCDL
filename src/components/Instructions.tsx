export function Instructions() {
  return <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-bold">How to Use This Calculator</h2>
        <p className="text-gray-600">
          This tool helps you estimate software project effort using the Use
          Case Points (UCP) method. Follow the steps below to generate your
          estimate.
        </p>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Step 1: Enter Use Case Points Data
        </h3>
        <div className="p-4 rounded-lg bg-gray-50">
          <p className="mb-2">In the UCP tab:</p>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>
              Enter the number of actors in each complexity category (Simple,
              Average, Complex)
            </li>
            <li>Enter the number of use cases in each complexity category</li>
            <li>
              Set your productivity factor (hours per UCP), typically between
              15-30
            </li>
          </ol>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Step 2: Adjust Technical Complexity Factors
        </h3>
        <div className="p-4 rounded-lg bg-gray-50">
          <p className="mb-2">In the TCF tab:</p>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>
              Rate each technical factor from 0 (no influence) to 5 (strong
              influence)
            </li>
            <li>
              The system automatically calculates the Technical Complexity
              Factor (TCF)
            </li>
          </ol>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Step 3: Adjust Environmental Factors
        </h3>
        <div className="p-4 rounded-lg bg-gray-50">
          <p className="mb-2">In the EF tab:</p>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>
              Rate each environmental factor from 0 (no influence) to 5 (strong
              influence)
            </li>
            <li>
              The system automatically calculates the Environmental Factor (EF)
            </li>
          </ol>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Step 4: View Results</h3>
        <div className="p-4 rounded-lg bg-gray-50">
          <p className="mb-2">In the Results tab:</p>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>Review the calculated UCP value</li>
            <li>Check the estimated effort in hours, days, and months</li>
            <li>
              Use these estimates for project planning and resource allocation
            </li>
          </ol>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-blue-50">
        <h3 className="mb-2 text-lg font-semibold">
          Understanding the Formulas
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium">Unadjusted Use Case Points (UUCP):</p>
            <p>UUCP = UAW + UUCW</p>
            <p className="text-xs text-gray-600">
              Where UAW is Unadjusted Actor Weight and UUCW is Unadjusted Use
              Case Weight
            </p>
          </div>
          <div>
            <p className="font-medium">Technical Complexity Factor (TCF):</p>
            <p>TCF = 0.6 + (0.01 × TFactor)</p>
            <p className="text-xs text-gray-600">
              Where TFactor is the sum of all technical factors multiplied by
              their weights
            </p>
          </div>
          <div>
            <p className="font-medium">Environmental Factor (EF):</p>
            <p>EF = 1.4 + (-0.03 × EFactor)</p>
            <p className="text-xs text-gray-600">
              Where EFactor is the sum of all environmental factors multiplied
              by their weights
            </p>
          </div>
          <div>
            <p className="font-medium">Use Case Points (UCP):</p>
            <p>UCP = UUCP × TCF × EF</p>
          </div>
          <div>
            <p className="font-medium">Effort Estimate:</p>
            <p>Effort = UCP × Productivity Factor (hours/UCP)</p>
          </div>
        </div>
      </div>
      <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
        <h3 className="mb-2 text-lg font-semibold">
          Tips for Accurate Estimation
        </h3>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>Be consistent in how you classify actors and use cases</li>
          <li>
            Involve team members when rating technical and environmental factors
          </li>
          <li>
            Adjust your productivity factor based on historical data from
            similar projects
          </li>
          <li>Re-evaluate estimates as more information becomes available</li>
          <li>
            Consider using a range (optimistic/pessimistic) rather than a single
            value
          </li>
        </ul>
      </div>
    </div>;
}