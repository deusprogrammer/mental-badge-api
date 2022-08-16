const express = require('express');
const Profiles = require('../models/profiles');

export let router = express.Router();
export let publicRouter = express.Router();
router.route("/")
    .get(async (request, response) => {
        let profiles = await Profiles.find({}, null).exec();
        return response.json(profiles);
    })
    .post(async ({body: profile}, response) => {
        profile.hp = 100;
        profile.xp = 0;
        profile.level = 1;
        profile.statuses = [];
        profile = await Profiles.create(profile);
        return response.json(profile);
    })

router.route("/:username")
    .get(async ({params: {username}}, response) => {
        try {
            let profile = await Profiles.findOne({username}, null).exec();
            if (!profile) {
                response.status(404);
                return response.send();
            }

            return response.json(profile);
        } catch (error) {
            response.status(500);
            return response.send();
        }
    })
    .put(async ({params: {username}, body: profile, user: {username: authUser}}, response) => {
        try {
            console.log("AUTHED USER " + JSON.stringify(authUser));
            console.log("USERNAME    " + username);
            if (authUser !== username) {
                response.status(403);
                return response.send();
            }

            profile = await Profiles.updateOne({username}, profile);
            return response.json(profile);
        } catch (error) {
            response.status(500);
            return response.send();
        }
    })
    .delete(async ({params: {username}, user: {username: authUser}}, response) => {
        try {
            if (authUser !== username) {
                response.status(403);
                return response.send();
            }

            await Profiles.deleteOne({params: {username}});
            return response.send();
        } catch (error) {
            response.status(500);
            return response.send();
        }
    })

publicRouter.route("/:id")
    .get(async ({params: {id: _id}}, response) => {
        let profile = await Profiles.findOne({_id}, null).exec();

        if (!profile) {
            response.status(404);
            return response.send();
        }

        return response.json(profile);
    })