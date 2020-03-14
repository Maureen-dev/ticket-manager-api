import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entity/User";
import { validate } from "class-validator";
import  createToken  from "../utils/createToken"


export class UserController {
  public createUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { userName, password, email, firstName, lastName } = req.body;
    let user = new User();
    user.userName = userName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
  
    //Validade the parameters 
    const errors = await validate(user, { validationError: { target: false } });
    if (errors.length > 0) {
      res.status(400).json({
        status: 'Fail',
        data:{error: errors[0].constraints
}
       });
      return;
    }
  
    //Hash the password, to securely on DB
    user.hashPassword();
  
    //Checks for unique username and email before saving
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (error) {
      res.status(409).json({
       message: "username or email already exists.",
       status: 'Fail',
      });
      return;
    }
  
    //Sends 201 status and created instance when saved
    res.status(201).json(
      {message: "User Created Succesfully.",
       status: 'Success',
       data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          role: user.role
        }
      },
      }
    )
  }

  public loginUser = async (req: Request, res: Response) => {
    let { userNameOrEmail, password } = req.body;

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    if (userNameOrEmail.includes('@')){
      try {
        user = await userRepository.findOneOrFail({ email: userNameOrEmail });
      } catch (error) {
        res.status(401).json(
          {message: "userNameOrEmail or Password is not correct.",
           status: 'Fail',
          }
        );
        return;
      }
    }
    else{
      try {
        user = await userRepository.findOneOrFail({ userName: userNameOrEmail });
      } catch (error) {
        res.status(401).json(
          {message: "userNameOrEmail or Password is not correct.",
           status: 'Fail',
          }
        );
        return;
      }
    }
    
    //Check encrypted password match
    if (!user.checkPassword(password)) {
      res.status(401).json(
        {message: "userNameOrEmail or Password is not correct.",
         status: 'Fail',
        }
      );
      return;
    }

    //Create Token
    const token = createToken(user.id,user.email, user.userName)
    res.status(200).json(
      {message: "User logged in successfully",
       status: 'Success',
       data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          role: user.role
        },
        token
      },
      }
    );
    return;
  };

}