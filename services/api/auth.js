import { constants } from "../../data";
import storage from "../../helpers/storage";

const auth = {
  isAuth: () => {
    return new Promise((resolve, reject) => {
      storage.get(constants.USER)
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  }
};

export default auth;
