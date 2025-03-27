export default function Footer({ theme = "gray" }) {
    const themes = {
      gray: "bg-gray-900 text-gray-300",
      blue: "bg-blue-900 text-blue-300",
      maroon: "bg-red-900 text-red-300",
    };
  
    return (
      <footer className={`${themes[theme]} py-6 mt-10`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* School Info */}
            <div>
              <h2 className="text-lg font-semibold text-white">Kambata Primary</h2>
              <p className="text-sm">Providing quality education for a better future.</p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li><a href="/timetable" className="hover:underline">Timetable</a></li>
                <li><a href="/performance" className="hover:underline">Student Performance</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4 mt-2">
                <a href="#" className="hover:text-white">🔵 Facebook</a>
                <a href="#" className="hover:text-white">📷 Instagram</a>
                <a href="#" className="hover:text-white">🐦 Twitter</a>
              </div>
            </div>
          </div>
  
          <hr className="border-gray-600 my-4" />
  
          {/* Copyright */}
          <div className="text-center text-sm">
            © {new Date().getFullYear()} School Name. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  }