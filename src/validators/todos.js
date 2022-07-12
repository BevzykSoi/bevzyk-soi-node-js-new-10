const Yup = require('yup');

exports.createOrUpdate = Yup.object().shape({
  text: Yup.string()
    .min(3, 'Поле text повинно бути довше 3')
    .max(255)
    .required(),
  priority: Yup.number().min(1).max(10).required(),
});

exports.updateStatus = Yup.object().shape({
  completed: Yup.boolean().required(),
});
