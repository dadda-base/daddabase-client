import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_URL;

function EditResourcePage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [videoUrl, setVideoUrl] = useState("")

    const { resourceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(baseURL + "/api/resources/" + resourceId)
            .then((response) => {
                const resource = response.data;
                setTitle(resource.title);
                setDescription(resource.description);
                setImageUrl(resource.imageUrl);
                setVideoUrl(resource.videoUrl);
            })
            .catch((error) => console.log(error));
        //project id change then update
    }, [resourceId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description, imageUrl, videoUrl };

        axios
            .put(baseURL + "/api/resources/" + resourceId, requestBody)
            .then((response) => {
                navigate("/resources/" + resourceId)
            });
    };


    return (
        <div className="EditResourcePage">
            <h3>Edit the Resource</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>URL of image or video:</label>
                <input
                    type="url"
                    name="imageUrl"
                    value={imageUrl}
                    placeholder="enter the url of image"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <input
                    type="url"
                    name="videoUrl"
                    value={videoUrl}
                    placeholder="enter the url of video"
                    onChange={(e) => setVideoUrl(e.target.value)}
                />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default EditResourcePage;