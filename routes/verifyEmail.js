/**
api/verify email route that checks URL param for the authToken
-> change User id

URL params: ?authToken=xyz&from=email@gmail.com
-> possible errors:
- authToken doesn't return a userId {authToken not valid}
- no email param {no email param}
- email param doesn't match user._id
 */
