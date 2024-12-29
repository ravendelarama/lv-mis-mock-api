import expressAsyncHandler from "express-async-handler";
import axios, { AxiosError } from "axios";
import { response } from "../../utils/response";
import environment from "../../constants/environment";

export const handleSamsAuthentication = expressAsyncHandler(
  async (req, res) => {
    try {
      const authToken = req.headers.authorization?.split(' ')[1] || "";

      const axiosResponse = await axios.post(`${environment.samsServiceUrl as string}/api/x-system/authenticate`, {}, { headers: {
        Authorization: `Bearer ${authToken}`,
      } });

      if (axiosResponse.status === 200) {

        return response(res, 200, true, "Authenticated!", {
          redirectUri: `${environment.samsClientUrl}/auth/callback?at=${authToken}`,
        });
      } else {
        res.status(axiosResponse.status).send(axiosResponse.data);
      }
    } catch (err: any) {
      response(res, 500, false, err.response.data.message || "Internal server error");
    }
  }
);
