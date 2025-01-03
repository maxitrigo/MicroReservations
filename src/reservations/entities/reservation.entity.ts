import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Resources } from "../../resources/entities/resource.entity";

@Index(['day', 'time', 'resourceId'])
@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4()

    @Column()
    day: string

    @Column()
    time: string

    @Column()
    date: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column('uuid')
    userId: string

    @Column({
        default: 'Pending'
    })
    status: string

    @Column('uuid') // Esta columna es la que falta
    resourceId: string; // Asegúrate de definir la columna resourceId

    @ManyToOne( () => Resources, (resource) => resource.reservations )
    @JoinColumn({ name: 'resourceId' })
    resource: Resources

}
