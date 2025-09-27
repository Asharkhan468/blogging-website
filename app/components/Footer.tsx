// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-400">
            DevBlog is a modern blogging platform where developers share ideas,
            tips, and tutorials to grow together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Create</a></li>
            <li><a href="#" className="hover:text-blue-400">About</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Find me on</h3>
          <p className="text-gray-400 mb-4">Feel free to connect with me</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.48 8.48 0 01-2.7 1.03 4.23 4.23 0 00-7.21 3.86A12 12 0 013 4.79a4.23 4.23 0 001.31 5.65 4.2 4.2 0 01-1.91-.53v.05a4.24 4.24 0 003.4 4.15 4.3 4.3 0 01-1.9.07 4.24 4.24 0 003.95 2.93A8.5 8.5 0 012 19.54a12 12 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.18 8.18 0 0022.46 6z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-8 19H8v-8h3v8zm-1.5-9.3a1.74 1.74 0 110-3.48 1.74 1.74 0 010 3.48zM20 19h-3v-4.5c0-1.1-.4-1.8-1.3-1.8-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.8V19h-3v-8h3v1.1c.4-.7 1.1-1.3 2.2-1.3 1.6 0 2.5 1 2.5 3.2V19z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .29a12 12 0 1012 12A12 12 0 0012 .29zm0 18a6 6 0 116-6 6 6 0 01-6 6zm6.5-10.4a1.4 1.4 0 11-1.4-1.4 1.4 1.4 0 011.4 1.4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 py-4 border-t border-gray-800">
        © {new Date().getFullYear()} DevBlog. All rights reserved.
      </div>
    </footer>
  );
}
