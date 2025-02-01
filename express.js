app.put("/update-profile", async (req, res) => {
    try {
        const { fullName, email, phone, nationalId } = req.body;

        const user = await User.findOneAndUpdate(
            { email: email },  // Find by email
            { fullName, phone, nationalId },  // Update fields
            { new: true }  // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully!", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});
