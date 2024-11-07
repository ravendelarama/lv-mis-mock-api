import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import { response } from "../../utils/response";

const isProd = process.env.NODE_ENV === "production";

const samsClientUrl = isProd ? process.env.PROD_SAMS_CLIENT_URL:process.env.DEV_SAMS_CLIENT_URL;
const samsServiceUrl = isProd ? process.env.PROD_SAMS_SERVICE_URL:process.env.DEV_SAMS_SERVICE_URL;

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
          withCredentials: true,
        }
      );

      if (axiosResponse.status === 200) {
        res.cookie("sams_auth_token", authToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        return response(res, 200, true, "Authenticated!", {
          redirectUri: "http://localhost:4201",
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
