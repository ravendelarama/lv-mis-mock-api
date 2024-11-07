import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import { response } from "../../utils/response";

const samsClientUrl = process.env.SAMS_CLIENT_URL_DEV;
const samsServiceUrl = process.env.SAMS_SERVICE_URL_DEV;

export const handleSamsAuthentication = expressAsyncHandler(
  async (req, res) => {
    try {
      const authToken = req.cookies["auth_token"];

      const axiosResponse = await axios.post(
        `${samsServiceUrl as string}/api/x-system/authenticate`,
        {},
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
          withCredentials: true
        }
      );

      if (axiosResponse.status === 200) {
        res.clearCookie('ams_auth_token')
        res.clearCookie('auth_token')
        res.cookie("sams_auth_token", authToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
          });
      
        return response(res, 200, true, "Authenticated!", {redirectUri: 'http://localhost:4201'})
      } else {
        res.status(axiosResponse.status).send(axiosResponse.data);
      }
    } catch (err) {
      console.log(err);
      response(res, 500, false, "Internal Server Error");
    }
  }
);
