const express = require('express');
const Profiles = require('../models/profiles');

export let router = express.Router();
export let publicRouter = express.Router();

const randomUuid = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

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
        let profile = await Profiles.findOne({username}, null).exec();
        return response.json(profile);
    })
    .put(async ({params: {username}}, response) => {
        let profile = await Profiles.updateOne({username}, profile);
        return response.json(profile);
    })
    .delete(async ({params: {username}}, response) => {
        await Profiles.deleteOne({params: {username}});
        return response.send();
    })

publicRouter.route("/:id")
    .get(async ({params: {id: _id}}, response) => {
        let profile = await Profiles.findOne({_id}, null).exec();
        return response.json(profile);
    })