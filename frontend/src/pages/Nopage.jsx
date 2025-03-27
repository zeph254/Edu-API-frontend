import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Option 1: Illustration Layout */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
              <p className="text-gray-600 mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to="/"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-center font-medium"
                >
                  Go Home
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 text-center font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-8">
            <img 
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" 
              alt="Lost student illustration"
              className="w-full h-auto max-h-80 object-contain"
            />
          </div>
        </div>

        {/* Option 2: Minimal Layout (uncomment to use) */}


        {/* Option 3: Creative Layout (uncomment to use) */}

      </div>
    </div>
  );
};

export default NoPage;