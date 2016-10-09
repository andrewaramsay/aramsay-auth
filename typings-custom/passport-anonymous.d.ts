declare module 'passport-anonymous' {

    import passport = require('passport');
    import express = require('express');

    class Strategy implements passport.Strategy {
        constructor();

        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }
}
