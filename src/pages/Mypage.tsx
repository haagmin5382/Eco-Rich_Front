import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { authService, storageService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { userReducer } from 'redux/user';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { getAuth, deleteUser } from 'firebase/auth';
// import AlertModal from 'components/Modal/AlertModal';

const ProfileContainer = styled.div`
  width: 30vw;
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 5vw;
  }
  @media screen and (max-width: 500px) {
    width: 50vw;
    font-size: 10px;
    h1 {
      font-size: 10vw;
    }
  }

  Button {
    @media screen and (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

function Mypage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const userProfile = useSelector((state: reduxState) => state.user.value);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userProfile.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(userProfile.photoURL);
  const changeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const refreshUser = () => {
    // 회원정보 수정했을 때 유저정보 업데이트

    dispatch(
      userReducer({
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        uid: user?.uid,
      }),
    );
  };

  const changeProfilePhoto = (e: any) => {
    const {
      target: { files },
    } = e;
    // const { files } = eventTarget;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setNewPhotoURL(result); // 미리보기 이미지 설정
    }; // 파일 읽기가 끝난 후 finishedEvent를 받는다.
    reader.readAsDataURL(theFile); // readAsDataURL을 사용해서 파일을 읽는다. (파일을 읽기 시작한다)
    e.target.value = '';
  };
  const editProfile = async () => {
    if (newDisplayName && authService.currentUser !== null) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    let attachmentURL;
    if (
      userProfile.photoURL !== newPhotoURL &&
      authService.currentUser !== null
    ) {
      const attachmentRef: any = ref(storageService, `${userProfile.uid}`);
      await uploadString(attachmentRef, newPhotoURL, 'data_url');

      attachmentURL = await getDownloadURL(ref(storageService, attachmentRef));
      await updateProfile(authService.currentUser, {
        photoURL: attachmentURL || newPhotoURL,
      });
    }
    refreshUser();
  };
  const withdraw = async () => {
    if (user) {
      await deleteUser(user);
      navigate('/');
    }
    // setIsModalOpen(true);
  };

  return (
    <div>
      <ProfileContainer>
        <h1>My Profile</h1>
        <form>
          <label htmlFor="profilePhoto" style={{ display: 'inline-block' }}>
            <Avatar
              src={newPhotoURL ? newPhotoURL : userProfile.photoURL}
              sx={{
                margin: '0 auto',
                width: '200px',
                height: '200px',
                cursor: 'pointer',
              }}
            />
          </label>
        </form>

        <input
          accept="image/*"
          id="profilePhoto"
          onChange={changeProfilePhoto}
          style={{ display: 'none' }}
          type="file"
        />
        <TextField
          autoComplete="displayName"
          fullWidth
          id="displayName"
          label={userProfile.displayName}
          margin="normal"
          name="displayName"
          onChange={changeDisplayName}
          required
          sx={{ fontSize: 'small' }}
        />

        <Button
          fullWidth
          onClick={editProfile}
          sx={{ mt: 3, mb: 2, fontSize: 'large' }}
          variant="contained"
        >
          회원정보 수정
        </Button>
        <Button
          fullWidth
          onClick={withdraw}
          sx={{
            mt: 1,
            mb: 2,
            fontSize: 'large',
            backgroundColor: '#F53829',
            ':hover': { backgroundColor: '#EAA8A3' },
          }}
          variant="contained"
        >
          회원 탈퇴
        </Button>
      </ProfileContainer>
      {/* {isModalOpen ? <AlertModal /> : null} */}
    </div>
  );
}

export default Mypage;
