import { ReactComponent as Logo } from '../../assets/fream-logo.svg';
import { AiFillGithub, AiOutlineUser } from 'react-icons/ai';

export const Header = () => {
  return (
    <header className="flex items-baseline justify-between pb-5 border-b border-gray-100 p-4 mb-10">
      <div>
        <Logo width={120} />
      </div>
      <div>
        <ul className="flex items-center">
          <li>
            <AiFillGithub className="w-6 h-6 mr-2" />
          </li>
          <li>
            <AiOutlineUser className="w-6 h-6" />
          </li>
        </ul>
      </div>
    </header>
  );
};
