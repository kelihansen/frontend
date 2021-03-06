'use strict';

(function(module) {

    const User = module.User;

    const loginView = {};

    loginView.init = () => {
        if(User.isAdmin || sessionStorage.getItem('isAdmin')) {
            $('#admin-form').hide();
            $('#logged-in').show();
        }
        else {
            $('#admin-form').off('submit').on('submit', handleSubmit);
            $('#logged-in').hide();
        }
        $('#admin-view').show();
    };

    const handleSubmit = event => {
        event.preventDefault();

        User.auth($('#passphrase').val())
            .then(user => {
                if(!user.isAdmin) alert('that\'s not the passphrase');
                else {
                    $('#admin-form')[0].reset();
                    $('#admin-form').hide();
                    $('#logged-in').show();
                    window.setTimeout(() => {
                        page('/');
                    }, 700);
                }
            });
    };

    module.loginView = loginView;

})(window.module);