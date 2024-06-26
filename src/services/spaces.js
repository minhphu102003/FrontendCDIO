import * as request from "../ultils/request";

const SPACES_ENDPOINT = "/api/blog/list-blog";
const UPDATE_ENDPOINT = "/api/blog/update-blog";
const ACCEPT_ENDPOINT = "/api/blog/accept-blog";
const DENIED_ENDPOINT = "/api/blog/denied-blog";


export const getSpace = async (paramsObject) => {
  try {
    return await request.get(SPACES_ENDPOINT, {
      params: paramsObject
    });
  } catch (error) {
    return error
  }
};

// const UPDATE_SPACES_ENDPOINT = "/api/spaces/update-space"

// export const updateSpace = async (spaceId,accessToken, formData) => {
//     try {
//         return await request.put(UPDATE_SPACES_ENDPOINT,
//             {
//                 params: spaceId,
//             },
//             {
//                 formData
//             }, 
            
//             {
//             headers: {
//                 'Content-Type': 'multipart/json',
//                 "Authorization": `Bearer ${accessToken}`
//             },
//             withCredentials: true
//         });
//     } catch (error) {
//         return error
//     }
// };
const UPDATE_SPACE_ENDPOINT = "/api/blog/update-space"

export const updateSpace = async (spaceId,formData, accessToken) => {
    try {
        return await request.put(UPDATE_SPACE_ENDPOINT,
            formData, 

            {
                params:spaceId,

                headers: {
                    "Content-Type": "application/form-data",
                    "Authorization": `Bearer ${accessToken}`
                },
                withCredentials: true
            });
    } catch (error) {
        return error
    }
};

const POST_SPACES_ENDPOINT = "/api/blog/create-space"

export const createSpace = async (accessToken, formData) => {
  try {
    return await request.post(POST_SPACES_ENDPOINT,
        formData
        , {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${accessToken}`
          },
          withCredentials: true
        });
  } catch (error) {
    return error
  }
};

export const acceptSpace = async (paramsObject, accessToken) => {
  console.log(paramsObject);
  try {
    const response = await request.put(
      ACCEPT_ENDPOINT,
      { ...paramsObject },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deniedSpace = async (paramsObject, accessToken) => {
  console.log(paramsObject);
  try {
    const response = await request.put(
      DENIED_ENDPOINT,
      { ...paramsObject },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

const DELETESPACE_ENDPOINT = "/api/blog/delete-space"
export const deleteSpace = async (spaceId, accessToken) => {
    try {
        const response = await request.deleteRe(DELETESPACE_ENDPOINT, {
            params:spaceId,
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return response;

    } catch (error) {
        return error
    }
};

