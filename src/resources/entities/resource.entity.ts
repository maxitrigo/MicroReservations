import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Reservation } from "../../reservations/entities/reservation.entity";

@Entity()
export class Resources {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4()

    @Column()
    duration: number

    @Column()
    name: string

    @Column()
    userId: string // id del encargado del recurso

    @OneToMany(() => Reservation, (reservation) => reservation.resource)
    reservations: Reservation[]
}
