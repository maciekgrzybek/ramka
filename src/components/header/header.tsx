import { ReactComponent as Logo } from '../../assets/fream-logo.svg';
import { AiFillGithub, AiOutlineUser } from 'react-icons/ai';

export const Header = () => {
  return (
    <header className="flex items-baseline justify-between pb-5 border-b border-gray-100 p-4 mb-10 lg:mb-0">
      <div>
        <Logo width={120} />
      </div>
      <div>
        <ul className="flex items-center">
          <li>
            <a
              href="https://github.com/maciekgrzybek"
              target="_blank"
              className="hover:text-blue-600 transition-colors ease-in duration-75"
            >
              <AiFillGithub className="w-6 h-6 mr-2" />
            </a>
          </li>
          <li>
            <a
              href="https://maciekgrzybek.dev"
              target="_blank"
              className="hover:text-blue-600 transition-colors ease-in duration-75"
            >
              <AiOutlineUser className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
