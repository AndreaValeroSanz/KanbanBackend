import jsonwebtoken from 'jsonwebtoken';

const  secretKey = "gommit"

const auth = (req, res, next) => {
	let token = req.headers.authorization || '';

	if (!token) {
		res.json({ error: 'no token' });
	} 
    token = token.split(' ')[1];

	jsonwebtoken.verify(token, secretKey, (error, decoded) => {
		if (error) {
			return res.json({ error: 'token no sirve' });
		} else {
			const { expiredAt } = decoded;
			if (expiredAt > new Date().getTime()) {
                req.userId = decoded.id;
				
				next();
			} else {
				return res.json({ error: 'token caducado' });
			}
		}
	});
};

const autError = (err, req, res, next) => {
	res.status(400).json(err);
};


//export { autentica, autError };
export {auth, autError};