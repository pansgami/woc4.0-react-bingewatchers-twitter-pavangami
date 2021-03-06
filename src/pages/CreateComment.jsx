import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function CreateComment({ id }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });

  // eslint-disable-next-line no-unused-vars
  const { name, comment } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({
            ...formData,
            userRef: user.uid,
            name: user.displayName,
            id: uuidv4(),
          });
        } else {
          //navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataCopy = {
      ...formData,
    };
    try {
      const docRef = doc(db, `/tweets/${id}`);
      await updateDoc(docRef, {
        comments: arrayUnion(formDataCopy),
      });

      setLoading(false);
      toast.success("Comment is successful...");

      setFormData((prevState) => ({
        ...prevState,
        comment: "",
      }));
      navigate("/");
    } catch (error) {
      //console.log(error);
      toast.error("Try again!!!");
    }
    navigate("/");
  };

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      comment: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="tweet-container">
        <div className="text-cotainer">
          <strong></strong>
        </div>
        <div className="cr">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="namecomment"
              id="comment"
              placeholder="Type your comment...."
              value={comment}
              onChange={onMutate}
              required
            />

            <button className="submitbutton">Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
