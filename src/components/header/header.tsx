import { ReactComponent as Logo } from '../../assets/ramka-logo.svg';
import { AiFillGithub } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="flex justify-between items-center pb-5 border-b border-primary-brand-200 p-4 md:px-8 mb-10">
      <div>
        <Logo width={80} />
      </div>
      <div>
        <ul className="flex items-center">
          <li>
            <a
              href="https://github.com/maciekgrzybek"
              target="_blank"
              className="hover:text-primary-brand-900 transition-colors ease-in duration-75"
            >
              <AiFillGithub className="w-6 h-6 mr-2" />
            </a>
          </li>
          <li>
            <a
              href="https://maciekgrzybek.dev"
              target="_blank"
              className="hover:text-primary-brand-900 transition-colors ease-in duration-75"
            >
              <FaUserCircle className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
