import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { ConfirmModal } from '../../components/confirm-modal';
import { TagForm } from '../../components/tag-form';
import { TagList } from '../../components/tag-list';
import { TaskForm } from '../../components/task-form';
import {
  allTagsSelector,
  createTag,
  deleteTag,
  editTag,
  tagByIdSelector,
} from '../../store/tag';
import {
  editTask,
  tagsByTaskIdSelector,
  taskByIdSelector,
} from '../../store/task';
import { useConfirmModal, useTagForm, useTaskForm } from '../../utils';

export function TaskPage() {
  const { id } = useParams();
  const taskId = +id;

  const [idTag, setIdTag] = useState('');
  const tags = useSelector(allTagsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.task.isLoading);

  const selectedTagsByTaskId = useSelector((state) =>
    tagsByTaskIdSelector(state, taskId),
  );

  const selectedTag = useSelector((state) => tagByIdSelector(state, idTag));
  const selectedTask = useSelector((state) => taskByIdSelector(state, taskId));

  const { handleCloseTaskForm } = useTaskForm();
  const {
    handleOpenEditTagForm,
    handleOpenCreateTagForm,
    handleCloseTagForm,
    isEditTagForm,
    isCreateTagForm,
  } = useTagForm();
  const { handleOpenTagConfirmModal, handleCloseConfirmModal, isTagForm } =
    useConfirmModal();

  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openTagList = Boolean(anchorEl);

  const handleEditTask = (data) => {
    dispatch(editTask({ id: taskId, text: data.text, tags: data.tags }))
      .unwrap()
      .then(() => {
        handleCloseTaskForm();
        navigate('/home');
      });
  };

  const handleDeleteTagById = (id) => {
    setIdTag(id);
    handleOpenTagConfirmModal();
  };

  const handleEditTagById = (id) => {
    setIdTag(id);
    handleOpenEditTagForm();
  };

  const handleEditTag = (data) => {
    dispatch(editTag({ id: idTag, name: data.text, color: data.color }))
      .unwrap()
      .then(() => {
        handleCloseTagForm();
      });
  };

  const handleDeleteTagFromList = () => {
    dispatch(deleteTag({ id: idTag, dispatch: dispatch }))
      .unwrap()
      .then(() => {
        handleCloseConfirmModal();
        setIdTag('');
      });
  };

  const handleAddTag = (data) => {
    dispatch(createTag({ name: data.text, color: data.color }))
      .unwrap()
      .then(() => {
        handleCloseTagForm();
      });
  };

  const handleClick = () => setAnchorEl(buttonRef.current);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <TaskForm
        isLoading={isLoading}
        onClose={() => navigate('/home')}
        onButtonAddTag={handleClick}
        buttonRef={buttonRef}
        tags={selectedTagsByTaskId}
        openTaskForm={true}
        onSubmit={handleEditTask}
        text={selectedTask?.text}
        title="Edit task"
        btnText="Save"
        renderTagForm={({ onCheck, checkedTags }) => (
          <TagList
            open={openTagList}
            anchorEl={anchorEl}
            onClose={handleClose}
            onOpenTagForm={handleOpenCreateTagForm}
            tags={tags}
            handleEditTagById={handleEditTagById}
            onDeleteTagFromList={handleDeleteTagById}
            onCheck={onCheck}
            checkedTags={checkedTags}
          />
        )}
      />
      <TagForm
        onClose={handleCloseTagForm}
        {...(isEditTagForm
          ? {
              onSubmit: handleEditTag,
              open: isEditTagForm,
              text: selectedTag?.name,
              color: selectedTag?.color,
              title: 'Edit tag',
              btnText: 'Edit tag',
            }
          : {
              onSubmit: handleAddTag,
              open: isCreateTagForm,
              title: 'Create tag',
              btnText: 'Create tag',
            })}
      />
      <ConfirmModal
        onClose={handleCloseConfirmModal}
        open={isTagForm}
        onDelete={handleDeleteTagFromList}
      >
        Are you sure you want to delete this tag?
      </ConfirmModal>
    </>
  );
}
