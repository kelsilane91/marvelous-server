// import package dependencies
import mongoose from 'mongoose';

// import models
import Hero from '../models/marvelous.server.model';

// get list of heroes
export const getHeroes = (request, response) => {
    Hero.find().exec((error, heroes) => {
        if(error) {
            return response.json({'success': false, 'message': 'ERROR'});
        }

        return response.json({'success': true, 'message': 'Heroes fetched successfully', heroes});
    });
}

// add a new hero
export const addHero = (request, response) => {
    const newHero = new Hero(request.body);
    newHero.save((error, hero) => {
        if(error) {
            return response.json({'success': false, 'message': 'ERROR'});
        }

        return response.json({'success': true, 'message': 'Hero added successfully', hero});
    });
}

// update a hero by id
export const updateHero = (request, response) => {
    Hero.findOneAndUpdate({ _id:request.body.id }, request.body, { new: true}, (error, hero => {
        if(error) {
            return response.json({'success': false, 'message': 'ERROR'});
        }

        return response.json({'success': true, 'message': 'Hero updated successfully', hero});
    }));
}

// get hero by id
export const getHero = (request, response) => {
    Hero.find({ _id: request.params.id }).exec((error, hero) => {
        if(error) {
            return response.json({'success': false, 'message': 'ERROR'});
        }
        else if(hero.length) {
            return response.json({'success': true, 'message': 'Hero fetch by id successfully', hero});
        }
        else {
            return response.json({'success': false, 'message': 'Hero with the given id not found'});
        }
    });
}

// update a hero by id
export const deleteHero = (request, response) => {
    Hero.findByIdAndRemove(request.params.id , (error, hero => {
        if(error) {
            return response.json({'success': false, 'message': 'ERROR'});
        }

        return response.json({'success': true, 'message': 'Hero deleted successfully'});
    }));
}