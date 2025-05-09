
// import CloseIcon from "@mui/icons-material/Close";

export default function UpdatePostModal() {


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async () => {
    // Validate form
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    if (!allFilled) {
      setError("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting update:", formData);

      // Replace with your actual API call
      const response = await fetch(
        `http://localhost:8080/api/posts/${formData.id}?userId=1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const result = await response.json();
      console.log("Update successful:", result);
      handleClose();
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message || "An error occurred while updating the post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Update Post
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Update Post
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Updated Post Title"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="excerpt"
              label="Excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Updated short description of the post"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Technology"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="coverImage"
              label="Cover Image URL"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="updated-image-url.jpg"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="content"
              label="Content"
              name="content"
              multiline
              rows={4}
              value={formData.content}
              onChange={handleChange}
              placeholder="Updated full content of the blog post..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitUpdate}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Updating..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
