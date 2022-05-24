import Form from '../Form';

const AddForm = () => {
    const initialValues = {
        title: "Test1",
        description: "Описание Test1",
    };
    const placeholder = { title: 'Введите заголовок', description: 'Введите описание' };
    const button = 'Добавить';
    const action = 'addPost';

    return (
        <>
            <Form
                initialValues={initialValues}
                placeholder={placeholder}
                button={button}
                action={action}
            />
        </>
    )
}

export default AddForm;  