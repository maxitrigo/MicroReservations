import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Reservation } from "../../reservations/entities/reservation.entity";

@Entity()
export class Resources {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4()

    @Column()
    name: string

    @Column({
        nullable: true
    })
    userId: string // id del encargado del recurso

    @Column()
    capacity: number

    @Column()
    duration: number

    @Column()
    interval: number

    @Column()
    visible: boolean

    @Column("jsonb")
    days: string[]

    @Column()
    startTime: string

    @Column()
    endTime: string

    @Column()
    gymId: string

    @OneToMany(() => Reservation, (reservation) => reservation.resource)
    reservations: Reservation[]
}
