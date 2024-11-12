import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import { response } from "../../utils/response";
import environment from "../../constants/environment";

export const handleSamsAuthentication = expressAsyncHandler(
  async (req, res) => {
    try {
      const authToken = req.cookies["auth_token"];
      console.log(authToken)

      const axiosResponse = await axios.post(`${environment.samsServiceUrl as string}/api/x-system/authenticate`, {}, { withCredentials: true });

      if (axiosResponse.status === 200) {
        res.cookie("auth_token", authToken, {
          httpOnly: true,
          secure: environment.isProd ? true : false,
          sameSite: environment.isProd ? "none" : "lax",
          maxAge: 60 * 60 * 1000,
        });

        return response(res, 200, true, "Authenticated!", {
          redirectUri: environment.samsClientUrl,
        });
      } else {
        res.status(axiosResponse.status).send(axiosResponse.data);
      }
    } catch (err) {
      console.log(err);
      response(res, 500, false, "Internal Server Error");
    }
  }
);
