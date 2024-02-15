import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videSchema = new Schema({
    videoFile:{
        type: String,  //cloudinary video url will be saved here
        required: [true, "Video file is required"]
    },

    thumbnail:{
        type: String,  //cloudinary image url will be saved here
        required: [true, "Thumbnail is required"]
    },
    title:{
        type: String,
        required: [true, "Title is required"],
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    duration:{
        type: Number, //we will get duration from cloudinary as cloudinary will store the duration of the video
        required: [true, "Duration is required"]
    },
    views:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps: true})

videSchema.plugin(mongooseAggregatePaginate);
// plugin is used to add extra functionality to the schema
// here we are adding pagination functionality to the schema
// this will allow us to paginate the videos
// pagination is used to display large number of videos in small chunks
// for example if we have 1000 videos and we want to display 10 videos per page	
export const Video = mongoose.model("Video",videoSchema);