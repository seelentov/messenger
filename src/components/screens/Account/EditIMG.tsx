import { FC, useState, FormEvent } from 'react';
import { updateData } from '../../../store/api/firebase/firebase.endpoints';
import styles from './Account.module.scss';

interface EditIMGProps {
  userId: string;
}

export const EditIMG: FC<EditIMGProps> = ({ userId }) => {
  const [input, setInput] = useState<string>('/src/assets/no-img.jpg');

  const [edit, setEdit] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateData('users', userId, {
      img: input,
    }).then(() => {
      setEdit(false);
    });
  };

  return (
    <>
      <img
        className={styles.editImage}
        src='/src/assets/edit.svg'
        onClick={() => setEdit(true)}
      />
      {edit && (
        <div className={styles.editImageBg}>
          <div className={styles.shadow} onClick={() => setEdit(false)}></div>
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
            className={styles.editImageModal}
          >
            <p onClick={() => setEdit(false)} className={styles.close}>
              Закрыть
            </p>
            <div className={styles.inputs}>
              <input
                placeholder='https://example.com/example-img'
                type='text'
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value !== ''
                      ? e.target.value
                      : '/src/assets/no-img.jpg'
                  )
                }
              />
              <input type='submit' value='Загрузить' />
            </div>
            <p>Вставьте URL картинки сюда</p>
          </form>
        </div>
      )}
    </>
  );
};