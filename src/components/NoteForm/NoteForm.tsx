import css from './NoteForm.module.css'
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik'
import * as Yup from "yup";

interface ModalProps {
  onClose: () => void;
    onPost: (valuse: ToDoFormValues) => void;
}

export interface ToDoFormValues {
    title: string,
    content: string,
    tag: string
}

const initialValues: ToDoFormValues = {
    title: '',
    content: '',
    tag: 'Todo' 
};


const NoteForm = ({ onClose, onPost }: ModalProps) => {

const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .min(2, "Content must be at least 2 characters")
    .max(500, "Content is too long")
    .required("Content is required"),
    tag: Yup.string().required("Tag is required").oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
});

  const handleSubmit = (
    values: ToDoFormValues,
    actions: FormikHelpers<ToDoFormValues>
  ) => {
    console.log("Order data:", values);
    onPost(values);
    actions.resetForm();
    onClose();
  };

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
    >
        <Form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <Field id="title" type="text" name="title" className={css.input} />
                {/* <span name="title" className={css.error} /> */}
                <ErrorMessage name="title" className={css.error} />
            </div>

            

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <Field
                    as="textarea"
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
                <ErrorMessage name="content" className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <Field as="select" id="tag" name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="tag" className={css.error} />
            </div>

            <div className={css.actions}>
                <button onClick={onClose} type="button" className={css.cancelButton}>
                Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                Create note
                </button>
            </div>
        </Form>
    </Formik>
  )
}

export default NoteForm
