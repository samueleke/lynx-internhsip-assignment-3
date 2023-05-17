import { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
/**
 * @swagger
 * components:
 *   schemas:
 *     Avatar:
 *       type: object
 *       required:
 *         - avatar
 *       properties:
 *         avatar:
 *           type: string
 *       example:
 *         avatar: media/avatar/2084398334.jpg
 * tags:
 *   name: Avatar
 *   description: The avatar managing API
 * 
 * /media/avatar/{id}:
 *   get:
 *     summary: Returns the avatar of a particular user
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     description: The id of the user
 *     responses:
 *       200:
 *         description: The avatar of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avatar'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: User not found
 */

export async function getAvatar(req: Request, res: Response) {
    const id = req.params?.id;
    const path = `./data/${id}.jpg`

    try {
        //Check if the avatar exists with the specified id
        if (fs.existsSync(path)) {
            res.setHeader('Content-Type', 'image/jpeg');
            fs.createReadStream(path).pipe(res);
            return;
        }
        //create a new avatar for the specified id
        const avatar = await axios.get(`http://placekitten.com/200/200`, {
            responseType: 'arraybuffer'
        });

        fs.writeFile(path, avatar.data, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(avatar.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}



// export async function getAvatar(req: Request, res: Response) {
//     const id = req.params?.id;
//     const path = `./data/${id}.jpg`

//     try {
//         //Check if the avatar exists with the specified id
//         if (fs.existsSync(path)) {
//             res.setHeader('Content-Type', 'image/jpeg');
//             fs.createReadStream(path).pipe(res);
//             return;
//         }
//         //create a new avatar for the specified id
//         const avatar = await axios.get(`http://placekitten.com/200/200`, { responseType: 'stream' });
//         res.setHeader('Content-Type', 'image/jpeg');
//         avatar.data.pipe(res);

//         pipeline(
//             avatar.data,
//             fs.createWriteStream(path),
//             (err) => {
//                 if (err) {
//                     res.status(500).send("Internal server error");
//                     throw err;
//                 }
//             }
//         );

//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal server error");
//     }
// }