import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Avatar } from 'antd';

import { US } from '../../types/app.types';
import { useAppDispatch, useStateSelector } from '../../hooks';
import { actionLogOut } from '../../store/userSlice';
import { togglePagination } from '../../store/UtilitySlice';
import { capitalizeWords } from '../../utilities';
import defaultAvatar from '../../assets/defaultAvatar.jpg';

import style from './UserPanel.module.scss';

const UserPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStatus: string = useStateSelector((state) => state.user.userStatus);
  const userName = useStateSelector((state) => state.user.user.username);
  const userAvatar = useStateSelector((state) => state.user.user.image);

  const handleLogOut = () => {
    dispatch(actionLogOut());
    navigate('/sign-in');
  };

  const handleCreateArticle = () => {
    dispatch(togglePagination(false));
    navigate('/new-article');
  };

  const unauthorized = (
    <>
      <Link to={'/sign-in'}>
        <Button className={`${style['user-panel__btn']} ${style['inactive']}`}>Sign In</Button>
      </Link>
      <Link to={'/sign-up'}>
        <Button className={`${style['user-panel__btn']} ${style['active']}`}>Sign Up</Button>
      </Link>
    </>
  );

  const authorized = (
    <>
      <Button
        className={`${style['user-panel__articleBtn']} ${style['active']}`}
        onClick={handleCreateArticle}
      >
        Create article
      </Button>
      <Link to={'/profile'}>
        <Space>
          <h2 className={style['user-panel__username']}>
            {userName && capitalizeWords(userName)}
          </h2>
          <Avatar size={45} src={userAvatar !== 'undefined' ? userAvatar : defaultAvatar} />
        </Space>
      </Link>
      <Button className={style['user-panel__btn']} onClick={handleLogOut}>
        Log Out
      </Button>
    </>
  );

  return (
    <Space className={style['user-panel']}>
      {userStatus === US.AUTH && authorized}
      {userStatus === US.UNAUTH && unauthorized}
    </Space>
  );
};

export default UserPanel;
