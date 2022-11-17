import { model, Schema, Model, Document } from 'mongoose';

interface IGame extends Document {
    title: string;
    description: string;
    price: number;
    releasedOn: Date;
    genre: string[];
    rating: number;
    multiplayer: boolean;
    ageRating: number;
    releasedBy: string;
    developer: string;
    reviews: string[];
}

const GameSchema: Schema = new Schema<IGame>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    releasedOn: {
        type: Date,
    },
    genre: [{
        type: String,
        required: true
    },
    ],
    rating: {
        type: Number,
    },
    multiplayer: {
        type: Boolean,
        required: true
    },
    ageRating: {
        type: Number,
        required: true
    },
    releasedBy: {
        type: String,
    },
    developer: {
        type: String,
        required: true
    },
    reviews: [{ type: String }]
})

const Game = model<IGame>('Game', GameSchema);

export = Game;