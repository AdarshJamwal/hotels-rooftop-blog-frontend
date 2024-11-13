const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [postBlog, { isLoading }] = usePostBlogMutation();
  const { user, token } = useSelector((state) => state.auth); // Access token here

  const navigate = useNavigate();

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
    });

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editorRef.current) {
      setMessage("Editor is not ready.");
      return;
    }

    try {
      const content = await editorRef.current.save();

      if (!title || !coverImg || !category || !metaDescription || rating <= 0) {
        setMessage("Please fill in all fields.");
        return;
      }

      const newPost = {
        title,
        coverImg,
        content,
        category,
        description: metaDescription,
        author: user?._id,
        rating,
      };

      const response = await postBlog(newPost, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token here
        },
      }).unwrap();

      if (response) {
        alert("Blog posted successfully!");
        navigate("/"); // Navigate to home page on success
      } else {
        setMessage("Authentication required.");
      }
    } catch (error) {
      console.error("Failed to submit the post", error);
      setMessage("Failed to submit the post.");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      {/* Render the form as before */}
    </div>
  );
};

export default AddPost;
