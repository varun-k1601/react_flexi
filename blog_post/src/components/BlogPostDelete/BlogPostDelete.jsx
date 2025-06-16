import React, { useState } from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const BlogPostDelete = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <DeleteButton onClick={() => setOpen(true)} disabled={loading} />
      <ConfirmationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default BlogPostDelete;
