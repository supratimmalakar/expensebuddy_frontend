const get_user_obj = (user) => {
    return {
        contact_name: `${user.first_name} ${user.last_name} (you)`,
        phone_number: user.phone_number,
        is_user: true,
        contact_user_id: user.id,
    };
};

export default get_user_obj;

