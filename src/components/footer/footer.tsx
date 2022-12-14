import { SiBuymeacoffee } from 'react-icons/si';
import { Link } from '@tanstack/react-router';

export const Footer = () => (
  <footer className="text-primary-brand-800 text-xs text-center mb-5 mt-10 px-4 flex flex-col items-center">
    <hr className="my-8 h-px bg-primary-brand-200 border-0 w-full max-w-2xl" />
    <span className="mb-3">
      made with ❤️ &nbsp; by{' '}
      <a
        href="https://maciekgrzybek.dev"
        className="hover:text-primary-brand-900"
        target="_blank"
      >
        maciek grzybek
      </a>{' '}
      and{' '}
      <a
        href="https://www.behance.net/Denisxko"
        className="hover:text-primary-brand-900"
        target="_blank"
      >
        denis kharchenko
      </a>
    </span>
    <span className="mb-3">
      If you like this little project, consider supporting me with a hot cup of
      coffee.
    </span>
    <a
      href="https://www.buymeacoffee.com/maciekgrzybek"
      target="_blank"
      className="flex bg-green-500 hover:bg-green-600 transition-colors rounded-full py-2 px-3 md:px-5 ease-in duration-75 text-white text-md"
    >
      <SiBuymeacoffee className="w-4 h-4 mr-2" />
      Buy me a coffee.
    </a>
    <hr className="mt-8 mb-4 h-px bg-primary-brand-200 border-0 w-full max-w-2xl" />
    <div>
      <menu>
        <Link
          to="/privacy-policy"
          className="hover:text-primary-brand-900  text-xs"
        >
          Privacy Policy
        </Link>
      </menu>
    </div>
  </footer>
);
