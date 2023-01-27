import { useState, useContext } from "react";
import axios from "axios";
import "../components/AddResource.css"
import { AuthContext } from "../context/auth.context";
const baseURL = process.env.REACT_APP_API_URL;

function AddResource(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const { storedToken, authenticateUser ,user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description, imageUrl, videoUrl , userId: user._id};
        axios.post(baseURL + "/api/resources", requestBody)
            .then((response) => {
                setTitle("");
                setDescription("")
                setImageUrl("")
                setVideoUrl("")
                props.refreshResources();
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="AddResource">
            <h3>Add Resource</h3>

            <form className="addResourceForm" onSubmit={handleSubmit}>
                <label>Title:
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                   </label> 

                <label>Description:
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </label>
                <label>URL of image or video:
                <input
                    type="url"
                    name="imageUrl"
                    value={imageUrl}
                    placeholder="enter the url of image"
                    onChange={(e) => setImageUrl(e.target.value)}
                    />
                    </label>
                <input
                    type="url"
                    name="videoUrl"
                    value={videoUrl}
                    placeholder="enter the url of video"
                    onChange={(e) => setVideoUrl(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddResource;